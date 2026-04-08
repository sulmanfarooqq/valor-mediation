require('dotenv').config();
const { User, Setting, connectDB, mongoose } = require('../models');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@valormediation.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        status: 'active'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Default settings
    const settings = await Setting.findOne({ key: 'general' });
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
      console.log('✅ Default settings created');
    } else {
      console.log('ℹ️  Settings already exist');
    }

    console.log('✨ Seeding complete');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdmin();