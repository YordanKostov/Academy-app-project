import mongoose, { Schema, Types } from 'mongoose';
import { IUserGrade } from './user-grade.model';

interface ICourseModuleLecture {
  title: string;
  date: Date;
  userGrades: IUserGrade[];
}

const CourseModuleLectureSchema = new Schema<ICourseModuleLecture>({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userGrades: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      grade: {
        type: Number,
        required: true,
      },
    },
  ],
});

CourseModuleLectureSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: CourseModuleLectureDoc, ret: any) { delete ret._id; delete ret.password }
});

const CourseModuleLecture = mongoose.model<ICourseModuleLecture>('CourseModuleLecture', CourseModuleLectureSchema);
type CourseModuleLectureDoc = ReturnType<(typeof CourseModuleLecture)['hydrate']>;

export { CourseModuleLecture, CourseModuleLectureDoc, ICourseModuleLecture };