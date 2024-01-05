const { Ticket, Patient, Specialist } = require("../models/models");
const { Op } = require("sequelize");

class TicketManager {
  async createTicket(req, res, next) {
    try {
      const { visitDate, visitTime, patientId, specialistId, state } = req.body;
      const ticket = await Ticket.create({
        visitDate,
        visitTime,
        patientId,
        specialistId,
        state,
      });
      const patient = await Patient.findOne({ where: { id: patientId } });
      const countOfTickets = await Patient.update(
        { countOfTickets: patient.countOfTickets + 1 },
        { where: { id: patientId } }
      );
      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editTicket(req, res, next) {
    try {
      const { id } = req.params;
      const { visitDate, visitTime, patientId, specialistId } = req.body;
      const updatedTicket = await Ticket.update(
        { visitDate, visitTime, patientId, specialistId },
        { where: { id } }
      );
      return res.json(updatedTicket);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.update(
        { state: "Удален" },
        { where: { id } }
      );
      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
    }
  }

  async cancelTicket(req, res, next) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.destroy({ where: { id } });
      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const tickets = await Ticket.findAll();
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getTicketsForSpecialist(req, res, next) {
    try {
      const { id } = req.params;
      const tickets = await Ticket.findAll({
        where: { specialistId: id, state: "Активный" },
        include: {
          model: Patient,
        },
      });
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getTicketsForPatient(req, res, next) {
    try {
      const { id } = req.params;
      const tickets = await Ticket.findAll({
        where: {
          patientId: id,
          state: {
            [Op.ne]: "Удален",
          },
        },
        include: {
          model: Specialist,
        },
      });
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getOneTicket(req, res, next) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findOne({ where: { id } });
      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterTickets(req, res, next) {
    try {
      const { date, time, surname, name, patronymic, patientId } = req.body;
      const tickets = await Ticket.findAll({
        where: { visitDate: date, visitTime: time, patientId },
        include: [
          {
            model: Specialist,
            where: {
              surname,
              name,
              patronymic
            },
          },
        ],
      });
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterSchedule(req, res, next) {
    try {
      const { surname, name, patronymic, visitDate, visitTime, specialistId } =
        req.body;
      const condition =
        (surname || name || patronymic) && visitDate && visitTime
          ? {
              where: {
                state: "Активный",
                visitDate,
                visitTime,
                specialistId
              },
              include: {
                model: Patient,
                where: {
                  [Op.or]: [
                    {
                      surname: {
                        [Op.startsWith]: surname,
                      },
                    },
                    {
                      name: {
                        [Op.startsWith]: name,
                      },
                    },
                    {
                      patronymic: {
                        [Op.startsWith]: patronymic,
                      },
                    },
                  ],
                },
              },
            }
          : (surname || name || patronymic) && visitDate
          ? {
              where: {
                visitDate,
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
                where: {
                  [Op.or]: [
                    {
                      surname: {
                        [Op.startsWith]: surname,
                      },
                    },
                    {
                      name: {
                        [Op.startsWith]: name,
                      },
                    },
                    {
                      patronymic: {
                        [Op.startsWith]: patronymic,
                      },
                    },
                  ],
                },
              },
            }
          : (surname || name || patronymic) && visitTime
          ? {
              where: {
                visitTime,
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
                where: {
                  [Op.or]: [
                    {
                      surname: {
                        [Op.startsWith]: surname,
                      },
                    },
                    {
                      name: {
                        [Op.startsWith]: name,
                      },
                    },
                    {
                      patronymic: {
                        [Op.startsWith]: patronymic,
                      },
                    },
                  ],
                },
              },
            }
          : visitDate && visitTime
          ? {
              where: {
                visitDate,
                visitTime,
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
              },
            }
          : surname || name || patronymic
          ? {
              where: {
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
                where: {
                  [Op.or]: [
                    {
                      surname: {
                        [Op.startsWith]: surname,
                      },
                    },
                    {
                      name: {
                        [Op.startsWith]: name,
                      },
                    },
                    {
                      patronymic: {
                        [Op.startsWith]: patronymic,
                      },
                    },
                  ],
                },
              },
            }
          : visitDate
          ? {
              where: {
                visitDate,
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
              },
            }
          : visitTime
          ? {
              where: {
                visitTime,
                specialistId,
                state: "Активный",
              },
              include: {
                model: Patient,
              },
            }
          : null;
      const tickets = await Ticket.findAll(condition);
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getOccupiedTickets(req, res, next) {
    try {
      const { visitDate, specialistId } = req.body;
      const tickets = await Ticket.findAll({
        where: { visitDate, specialistId },
      });
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getActiveOrInactiveTickets(req, res, next) {
    try {
      const { id } = req.params;
      const { state } = req.body;
      const tickets = await Ticket.findAll({
        where: { patientId: id, state },
        include: [Specialist],
      });
      return res.json(tickets);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new TicketManager();
