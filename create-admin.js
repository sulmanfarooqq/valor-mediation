require('dotenv').config();
const { User, sequelize } = require('./models');

async function createAdmin() {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
    if (adminExists) {
      console.log('✅ Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123', // Sequelize hooks will hash this
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
