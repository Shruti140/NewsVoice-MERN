import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  }, { timestamps: true });

const Interaction = mongoose.model('Interaction', InteractionSchema);
export default Interaction;