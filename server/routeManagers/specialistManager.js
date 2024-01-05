const { Specialist, User } = require("../models/models");
const { Op } = require("sequelize");

class SpecialistManager {
  async getAllSpecialists(req, res, next) {
    try {
      const specialists = await Specialist.findAll({ include: [User] });
      return res.json(specialists);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteSpecialist(req, res, next) {
    try {
      const { id } = req.params;
      const specialist = await Specialist.destroy({ where: { id } });
      return res.json(specialist);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterSpecialists(req, res, next) {
    try {
      const { specialty } = req.body;
      const specialists = await Specialist.findAll({ where: { specialty } });
      return res.json(specialists);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getOneSpecialist(req, res, next) {
    try {
      const { id } = req.params;
      const specialist = await Specialist.findOne({ where: { id } });
      return res.json(specialist);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getSpecialistId(req, res, next) {
    try {
      const { id } = req.params;
      const specialist = await Specialist.findOne({ where: { userId: id } });
      return res.json(specialist);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterSpecialistsForAdmin(req, res, next) {
    try {
      const { surname, name, patronymic, specialty } = req.body;
      const condition =
        (surname || name || patronymic) && specialty
          ? {
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
              specialty,
            }
          : surname || name || patronymic
          ? {
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
            }
          : specialty
          ? {
              specialty,
            }
          : null;
      const specialists = await Specialist.findAll({ where: condition });
      return res.json(specialists);
    } catch (err) {
      console.error(err.message);
    }
  }

  async setSchedule(req, res, next) {
    try {
      const { specialistId, startTime, endTime, interval } = req.body;
      const specialist = await Specialist.update(
        { startTime, endTime, interval },
        { where: { id: specialistId } }
      );
      return res.json(specialist);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new SpecialistManager();
