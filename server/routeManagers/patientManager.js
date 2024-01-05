const { Op } = require("sequelize");
const { Patient, User } = require("../models/models");

class PatientManager {
  async getAllPatients(req, res, next) {
    try {
      const patients = await Patient.findAll({ include: [User] });
      return res.json(patients);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editPatient(req, res, next) {
    try {
      const { id } = req.params;
      const {
        surname,
        name,
        patronymic,
        gender,
        address,
        phoneNumber,
        placeOfWork,
        position,
        disability,
        dateOfBirth,
      } = req.body;

      const updatedPatient = await Patient.update(
        {
          surname,
          name,
          patronymic,
          gender,
          address,
          phoneNumber,
          placeOfWork,
          position,
          disability,
          dateOfBirth,
        },
        { where: { id } }
      );
      return res.json(updatedPatient);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deletePatient(req, res, next) {
    try {
      const { id } = req.params;
      const patient = await Patient.destroy({ where: { id } });
      return res.json(patient);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getOnePatient(req, res, next) {
    try {
      const { id } = req.params;
      const patient = await Patient.findOne({ where: { id }, include: [User] });
      return res.json(patient);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getPatientId(req, res, next) {
    try {
      const { id } = req.params;
      const patient = await Patient.findOne({ where: { userId: id } });
      return res.json(patient);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterPatients(req, res, next) {
    try {
      const { surname, name, patronymic, dateOfBirth, address } = req.body;

      const condition =
        (surname || name || patronymic) && dateOfBirth && address
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
              dateOfBirth,
              address: {
                [Op.startsWith]: address,
              },
            }
          : (surname || name || patronymic) && dateOfBirth
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
              dateOfBirth,
            }
          : (surname || name || patronymic) && address
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
              address: {
                [Op.startsWith]: address,
              },
            }
          : dateOfBirth && address
          ? {
              address: {
                [Op.startsWith]: address,
              },
              dateOfBirth,
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
          : dateOfBirth
          ? {
              dateOfBirth
            }
          : address
          ? {
              address: {
                [Op.startsWith]: address,
              },
            }
          : null;
      const patients = await Patient.findAll({
        where: condition,
      });
      return res.json(patients);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new PatientManager();
