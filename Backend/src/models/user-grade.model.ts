import mongoose, { Schema, Types } from 'mongoose';

interface IUserGrade {
  userId: Types.ObjectId;
  grade: number;
}

const UserGradeSchema = new Schema<IUserGrade>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

UserGradeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: UserGradeDoc, ret: any) { delete ret._id; delete ret.password }
});

const UserGrade = mongoose.model<IUserGrade>('UserGrade', UserGradeSchema);
type UserGradeDoc = ReturnType<(typeof UserGrade)['hydrate']>;

export { UserGrade, UserGradeDoc, IUserGrade };