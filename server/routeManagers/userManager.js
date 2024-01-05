const bcrypt = require("bcrypt");
const { User, Patient, Specialist } = require("../models/models");
const sequelize = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uuid = require("uuid");
const path = require("path");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserManager {
  async registration(req, res, next) {
    const regTransaction = await sequelize.transaction();
    try {
      const {
        surname,
        name,
        patronymic,
        dateOfBirth,
        gender,
        disability,
        address,
        placeOfWork,
        position,
        phoneNumber,
        specialty,
        workExperience,
        about,
        email,
        password,
        role,
      } = req.body;
      const { photo } = req.files;
      let fileName = uuid.v4() + ".jpg";
      photo.mv(path.resolve(__dirname, "..", "static", fileName));

      if (!email || !password) {
        return res.json({ message: "Некорректный email или password" });
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.json({
          message: "Пользователь с таким email уже существует",
        });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create(
        { email, password, role, password: hashPassword },
        { transaction: regTransaction }
      );

      if (role === "PATIENT") {
        const patient = await Patient.create(
          {
            userId: user.id,
            surname,
            name,
            patronymic,
            dateOfBirth,
            phoneNumber,
            gender,
            disability,
            address,
            placeOfWork,
            position,
            photo: fileName,
          },
          { transaction: regTransaction }
        );
      } else if (role === "SPECIALIST") {
        const specialist = await Specialist.create(
          {
            userId: user.id,
            surname,
            name,
            patronymic,
            dateOfBirth,
            gender,
            specialty,
            workExperience,
            about,
            photo: fileName,
          },
          { transaction: regTransaction }
        );
      }

      const token = generateJwt(user.id, email, role);

      await regTransaction.commit();

      return res.json({ token });
    } catch (err) {
      await regTransaction.rollback();
      console.error(err.message);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.json({ message: "Указан неверный пароль" });
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.destroy({ where: { id } });
      return res.json(user);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 5);

      const updatedUser = await User.update(
        {
          email,
          password: hashPassword,
        },
        { where: { id } }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      return res.json(user);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editPatientProfile(req, res, next) {
    const editTransaction = await sequelize.transaction();
    try {
      const {
        userId,
        patientId,
        surname,
        name,
        patronymic,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        placeOfWork,
        position,
        disability,
        email,
        oldPassword,
        newPassword,
        repeatNewPassword,
      } = req.body;
      const editUser = await User.findOne(
        { where: { id: userId } },
        { transaction: editTransaction }
      );
      const editPatient = await Patient.findOne(
        { where: { id: patientId } },
        { transaction: editTransaction }
      );
      if (newPassword && repeatNewPassword && oldPassword) {
        const comparePassword = bcrypt.compareSync(
          oldPassword,
          editUser.password
        );
        if (!comparePassword) {
          return res.json({ message: "Старый пароль неверный" });
        }
        if (newPassword !== repeatNewPassword) {
          return res.json({ message: "Новые пароли не совпадают" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 5);
        const updatedUser = await User.update(
          { email, password: hashPassword },
          { where: { id: userId } },
          { transaction: editTransaction }
        );
      }

      if (req.files !== null) {
        const { photo } = req.files;
        let fileName = uuid.v4() + ".jpg";
        photo.mv(path.resolve(__dirname, "..", "static", fileName));
        const updatedPhoto = await Patient.update(
          { photo: fileName },
          { where: { id: patientId } },
          { transaction: editTransaction }
        );
      }

      const updatedPatient = await Patient.update(
        {
          surname,
          name,
          patronymic,
          dateOfBirth,
          gender,
          address,
          phoneNumber,
          placeOfWork,
          position,
          disability
        },
        { where: { id: patientId } },
        { transaction: editTransaction }
      );

      await editTransaction.commit();

      return res.json({ message: "Редактирование прошло успешно" });
    } catch (err) {
      await editTransaction.rollback();
      console.error(err.message);
    }
  }

  async editSpecialistProfile(req, res, next) {
    const editTransaction = await sequelize.transaction();
    try {
      const {
        userId,
        specialistId,
        surname,
        name,
        patronymic,
        dateOfBirth,
        gender,
        about,
        workExperience,
        specialty,
        email,
        oldPassword,
        newPassword,
        repeatNewPassword,
      } = req.body;
      const editUser = await User.findOne(
        { where: { id: userId } },
        { transaction: editTransaction }
      );
      const editSpecialist = await Specialist.findOne(
        { where: { id: specialistId } },
        { transaction: editTransaction }
      );
      if (newPassword && repeatNewPassword && oldPassword) {
        const comparePassword = bcrypt.compareSync(
          oldPassword,
          editUser.password
        );
        if (!comparePassword) {
          return res.json({ message: "Старый пароль неверный" });
        }
        if (newPassword !== repeatNewPassword) {
          return res.json({ message: "Новые пароли не совпадают" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 5);
        const updatedUser = await User.update(
          { email, password: hashPassword },
          { where: { id: userId } },
          { transaction: editTransaction }
        );
      }

      if (req.files !== null) {
        const { photo } = req.files;
        let fileName = uuid.v4() + ".jpg";
        photo.mv(path.resolve(__dirname, "..", "static", fileName));
        const updatedPhoto = await Specialist.update(
          { photo: fileName },
          { where: { id: specialistId } },
          { transaction: editTransaction }
        );
      }

      const updatedSpecialist = await Specialist.update(
        {
          surname,
          name,
          patronymic,
          dateOfBirth,
          gender,
          about,
          workExperience,
          specialty,
        },
        { where: { id: specialistId } },
        { transaction: editTransaction }
      );

      await editTransaction.commit();

      return res.json({ message: "Редактирование прошло успешно" });
    } catch (err) {
      await editTransaction.rollback();
      console.error(err.message);
    }
  }
}

module.exports = new UserManager();
