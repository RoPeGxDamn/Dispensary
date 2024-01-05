const { Feedback, Patient, Specialist } = require("../models/models");
const { Op } = require("sequelize");

class FeedbackManager {
  async createFeedback(req, res, next) {
    try {
      const { body, title, rating, patientId, specialistId, publicStatus } = req.body;
      const feedback = await Feedback.create({ body, title, rating, patientId, specialistId, publicStatus });
      return res.json(feedback);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const { body, title, rating, patientId, specialistId, publicStatus } = req.body;
      const updatedFeedback = await Feedback.update(
        {
          body, title, rating, patientId, specialistId, publicStatus
        },
        { where: { id } }
      );
      return res.json(updatedFeedback);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const feedback = await Feedback.destroy({ where: { id } });
      return res.json(feedback);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getFeedbackOfSpecialist(req, res, next) {
    try {
      const {id} = req.params
      const feedback = await Feedback.findAll({where: {specialistId: id}, include: [Patient, Specialist]})
      return res.json(feedback)
    } catch (err) {
      console.error(err.message)
    }
  }

  async getAllFeedback(req, res, next) {
    try {
      const feedback = await Feedback.findAll({include: [Patient, Specialist]});
      return res.json(feedback);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new FeedbackManager();
