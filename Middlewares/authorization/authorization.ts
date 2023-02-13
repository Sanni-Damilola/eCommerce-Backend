import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { IUserData } from "../../Models/AllInterfaces";
import userModel from "../../Models/user.models";
import { AppError, HttpCode } from "../../Utils/AppError";



interface payLoad extends JwtPayload {
  _id: string;
  email: string;
}

const secret = crypto.

const secret = "chgsdhjhjfkkdnkldsnoslsnksbsjvyu";

export const generateToken = (user: payLoad) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1hr" });
};

// verify and authorize the user

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  // make request for our token  from headers in HTTP

  const headers = req.headers["authorization"];
  if (!headers || !headers.startsWith("Bearer ")) {
    next(
      new AppError({
        message: "You are Not Authorized",
        httpCode: HttpCode.UNAUTHORIZED,
      })
    );
  }

  const token: string = headers!.split(" ")[1];

  //   verify the token payLoad
  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodedUSer: any) => {
      if (err) {
        const errorMsg =
          err.name === "JsonWebTokenError"
            ? "Invaild token , You Are Unauthorized"
            : err.message;
        next(
          new AppError({
            message: errorMsg,
            httpCode: HttpCode.UNAUTHORIZED,
          })
        );
      }

      try {
        const verifiedUser = await userModel.findOne({ _id: decodedUSer?._id });
        if (!verifiedUser) {
          next(
            new AppError({
              httpCode: HttpCode.UNAUTHORIZED,
              message: "Unauthorized User",
            })
          );
        }
        req!.user = verifiedUser as IUserData;
        next();
      } catch (error: any) {
        next(
          new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            message: error,
          })
        );
      }
    }
  );
};
