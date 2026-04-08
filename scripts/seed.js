const { sequelize, User, Setting } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Admin user
    const existingAdmin = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin already exists');
    }

    // Default settings
    const settings = await Setting.findOne({ where: { key: 'general' } });
    if (!settings) {
      await Setting.create({
        key: 'general',
        value: {
          siteName: 'Valor Mediation, LLC',
          phone: '817-908-4070',
          email: 'rex@valormediation.com',
          address: '',
        },
      });
      console.log('Default settings created');
    } else {
      console.log('Settings already exist');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();