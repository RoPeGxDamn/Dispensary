const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "PATIENT", "SPECIALIST"),
      allowNull: false,
      defaultValue: "PATIENT",
    },
  },
  {
    tableName: "Users",
  }
);

const Patient = sequelize.define(
  "patient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    gender: {
      type: DataTypes.ENUM("мужской", "женский", "другое"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    placeOfWork: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    disability: {
      type: DataTypes.ENUM(
        "отсутствует",
        "1-я группа",
        "2-я группа",
        "3-я группа"
      ),
      allowNull: false,
      defaultValue: "отсутствует",
    },
    countOfTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Patients",
    timestamps: false,
  }
);

const Specialist = sequelize.define(
  "specialist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    gender: {
      type: DataTypes.ENUM("мужской", "женский", "другое"),
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workExperience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    interval: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Specialists",
    timestamps: false,
  }
);

const Diagnosis = sequelize.define(
  "diagnosis",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cipher: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Diagnoses",
    timestamps: false,
  }
);

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    visitTime: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("Активный", "Неактивный", "Удален"),
      defaultValue: "Активный",
      allowNull: false,
    },
  },
  {
    tableName: "Tickets",
    timestamps: false,
  }
);

const Visit = sequelize.define(
  "visit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    tableName: "Visits",
    timestamps: false,
  }
);

const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publicStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: "Feedback",
    timestamps: true,
  }
);

const Announcement = sequelize.define(
  "announcement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reader: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "Announcements",
    timestamps: true,
  }
);

User.hasOne(Patient, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Patient.belongsTo(User);

User.hasOne(Specialist, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Specialist.belongsTo(User);

Diagnosis.hasMany(Visit, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Visit.belongsTo(Diagnosis);

Ticket.hasMany(Visit, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Visit.belongsTo(Ticket);

Specialist.hasMany(Ticket, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Ticket.belongsTo(Specialist);

Patient.hasMany(Ticket, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Ticket.belongsTo(Patient);

Specialist.hasMany(Feedback, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Feedback.belongsTo(Specialist);

Patient.hasMany(Feedback, {
  onDelete: "cascade",
  onUpdate: "cascade",
});
Feedback.belongsTo(Patient);

module.exports = {
  User,
  Patient,
  Specialist,
  Diagnosis,
  Visit,
  Ticket,
  Feedback,
  Announcement
};
