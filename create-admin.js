require('dotenv').config();
const { User, connectDB, mongoose } = require('./models');

async function createAdmin() {
  try {
    // Fill credentials from .env or use defaults
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@valormediation.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = 'Admin';

    // Connect to MongoDB
    await connectDB();

    // Check if admin exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log('✅ Admin user already exists');
      mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword, // Mongoose pre-save hook will hash this
      role: 'admin',
      status: 'active'
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', adminPassword);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
