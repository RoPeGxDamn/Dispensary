const { Op } = require("sequelize");
const { Visit, Diagnosis, Ticket, Specialist, Patient } = require("../models/models");

class VisitManager {
  async getAllVisits(req, res, next) {
    try {
      const visits = await Visit.findAll({include: [
        Diagnosis,
        {
        model: Ticket,
        include: [Patient, Specialist]
      }
      ]});
      return res.json(visits);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editVisit(req, res, next) {
    try {
      const { id } = req.params;
      const { diagnosisId } = req.body;

      const updatedVisit = await Visit.update(
        {
          diagnosisId,
        },
        { where: { id } }
      );
      return res.json(updatedVisit);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteVisit(req, res, next) {
    try {
      const { id } = req.params;
      const visit = await Visit.destroy({ where: { id } });
      return res.json(visit);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getVisitsForCard(req, res, next) {
    try {
      const { id } = req.params;
      const visits = await Visit.findAll({
        include: [
          Diagnosis,
          {
            model: Ticket,
            where: {
              patientId: id,
            },
            include: Specialist
          },
        ],
      });
      return res.json(visits);
    } catch (err) {
      console.error(err.message);
    }
  }

  async createVisit(req, res, next) {
    try {
      const { ticketId, diagnosisId } = req.body;
      const updatedTicket = await Ticket.update({state: 'Неактивный'},{where: {id: ticketId}})
      const visit = await Visit.create({
        ticketId,
        diagnosisId,
      });
      return res.json(visit);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getVisitsByDate(req, res, next) {
    try {
      const { visitDate, specialistId } = req.body;
      const visits = await Visit.findAll({
        include: [
          {
            model: Ticket,
            where: {
              visitDate,
              specialistId,
            },
          },
        ],
      });
      return res.json(visits);
    } catch (err) {
      console.error(err.message);
    }
  }

  // async getMostPopularSpecialist(req, res, next) {
  //   try {
  //     const { specialistId, patientId } = req.body
  //     const specialist = await Visit.count({where: {specialistId, patientId} })
  //     return res.json(specialist)
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }
}

module.exports = new VisitManager();
