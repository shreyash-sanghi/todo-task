import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
  ref: "UserModel",  
  required: true,
    },
    taskName: { type: String, required: true },
    taskDescription: {
      type: String,
      required: true,
    },

    taskDeadline: { type: String, required: true },
    taskTime: { type: String, required: true },

    currentStatus: {
      type: String,
      enum: ["Pending", "Completed","Overdue"],
      default: "Pending",
    },
    complteDate:{
    type : Date,
    },
  },
  { timestamps: true }
);



taskSchema.statics.createTask = async function(data) {
  console.log(data);
  const task = new this(data);
  return await task.save();
};

taskSchema.statics.editTask = async function (userId,taskId, data) {
  return await this.findOneAndUpdate(
    { _id: taskId, userId },
    data,
    { new: true }
  );
};


taskSchema.statics.changeStatus = async function (userId, taskId, status) {
  const update = { currentStatus: status };

  if (status === "Completed") {
    update.complteDate = new Date();
  }

  return await this.findOneAndUpdate(
    { _id: taskId, userId },
    update,
    { new: true }
  );
};


taskSchema.statics.deleteTask = async function (userId,taskId) {
  return await this.findOneAndDelete({
    _id: taskId,
    userId,
  });
};
taskSchema.statics.getPandingCount = async function (userId) {
  return await this.countDocuments({
    userId,
    currentStatus: "Completed"
  });
};


taskSchema.statics.getTasks = async function (userId) {
  return await this.find({ userId }).lean();
};




const Task = mongoose.model('TaskModel', taskSchema);

export default Task;
