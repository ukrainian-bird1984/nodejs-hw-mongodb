import { model, Schema } from 'mongoose';

console.log("Before defining schema");
const sessionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

console.log("Before exporting session collection");
export const SessionCollection = model('sessions', sessionsSchema);
console.log("After exporting session collection");
