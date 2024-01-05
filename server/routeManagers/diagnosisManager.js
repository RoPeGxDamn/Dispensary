const { Diagnosis } = require("../models/models");
const { Op } = require("sequelize");

class DiagnosisManager {
  async createDiagnosis(req, res, next) {
    try {
      const { name, cipher } = req.body;
      const diagnosis = await Diagnosis.create({ name, cipher });
      return res.json(diagnosis);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editDiagnosis(req, res, next) {
    try {
      const { id } = req.params;
      const { name, cipher } = req.body;
      const updatedDiagnosis = await Diagnosis.update(
        {
          name,
          cipher,
        },
        { where: { id } }
      );
      return res.json(updatedDiagnosis);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteDiagnosis(req, res, next) {
    try {
      const { id } = req.params;
      const diagnosis = await Diagnosis.destroy({ where: { id } });
      return res.json(diagnosis);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAllDiagnoses(req, res, next) {
    try {
      const diagnoses = await Diagnosis.findAll();
      return res.json(diagnoses);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterDiagnoses(req, res, next) {
    try {
      const { id, name, cipher } = req.body;
      if (id) {
        const diagnosis = await Diagnosis.findAll({ where: { id } });
        return res.json(diagnosis);
      } else if (name) {
        const diagnosis = await Diagnosis.findAll({
          where: {
            name: {
              [Op.startsWith]: name,
            },
          },
        });
        return res.json(diagnosis);
      } else if (cipher) {
        const diagnosis = await Diagnosis.findAll({
          where: {
            cipher: {
              [Op.startsWith]: cipher,
            },
          },
        });
        return res.json(diagnosis);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterDiagnosesForAdmin(req, res, next) {
    try {
      const { name, cipher } = req.body;
      const condition =
        name && cipher
          ? {
              name: {
                [Op.startsWith]: name,
              },
              cipher: {
                [Op.startsWith]: cipher,
              },
            }
          : name
          ? {
              name: {
                [Op.startsWith]: name,
              },
            }
          : cipher
          ? {
              cipher: {
                [Op.startsWith]: cipher,
              },
            }
          : null;
      const diagnoses = await Diagnosis.findAll({ where: condition });
      return res.json(diagnoses);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new DiagnosisManager();
