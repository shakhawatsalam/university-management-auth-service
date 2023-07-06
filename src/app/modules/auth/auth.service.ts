import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/Apierror';
import { jwtHelpars } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

// Login User
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { id, password } = payload;
  // Creating instance of User
  // const user = new User();
  // With Static Methods
  // access to our instance methods for check User Exist
  // const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);
  // if password not exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }

  // Match password
  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create assess token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpars.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // Refresh Token
  const refreshToken = jwtHelpars.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// Refresh Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken: JwtPayload | null = null;
  try {
    verifiedToken = jwtHelpars.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist');
  }

  // generate new token
  const newAccessToken = jwtHelpars.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
