const { Announcement } = require("../models/models");
const { Op } = require("sequelize");

class AnnouncementManager {
  async createAnnouncement(req, res, next) {
    try {
      const { title, message, reader } = req.body;
      const announcement = await Announcement.create({
        title,
        message,
        reader,
      });
      return res.json(announcement);
    } catch (err) {
      console.error(err.message);
    }
  }

  async editAnnouncement(req, res, next) {
    try {
      const { id } = req.params;
      const { title, message, reader } = req.body;
      const updatedAnnouncement = await Announcement.update(
        {
          title,
          message,
          reader,
        },
        { where: { id } }
      );
      return res.json(updatedAnnouncement);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteAnnouncement(req, res, next) {
    try {
      const { id } = req.params;
      const announcement = await Announcement.destroy({ where: { id } });
      return res.json(announcement);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAllAnnouncements(req, res, next) {
    try {
      const announcements = await Announcement.findAll();
      return res.json(announcements);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAnnouncementsForReader(req, res, next) {
    try {
      const { reader } = req.body;
      const announcements = await Announcement.findAll({ where: { reader } });
      return res.json(announcements);
    } catch (err) {
      console.error(err.message);
    }
  }

  async filterAnnouncements(req, res, next) {
    try {
      const { title, message, reader } = req.body;
      const condition =
        title && message && reader
          ? {
              title: {
                [Op.startsWith]: title,
              },
              message: {
                [Op.startsWith]: message,
              },
              reader: {
                [Op.startsWith]: reader,
              },
            }
          : title && message
          ? {
              title: {
                [Op.startsWith]: title,
              },
              message: {
                [Op.startsWith]: message,
              },
            }
          : message && reader
          ? {
              message: {
                [Op.startsWith]: message,
              },
              reader: {
                [Op.startsWith]: reader,
              },
            }
          : title && reader
          ? {
              title: {
                [Op.startsWith]: title,
              },
              reader: {
                [Op.startsWith]: reader,
              },
            }
          : title
          ? {
              title: {
                [Op.startsWith]: title,
              },
            }
          : message
          ? {
              message: {
                [Op.startsWith]: message,
              },
            }
          : reader
          ? {
              reader: {
                [Op.startsWith]: reader,
              },
            }
          : null;
      const announcements = await Announcement.findAll({ where: condition});
      return res.json(announcements);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new AnnouncementManager();
