require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('./models');

async function resetAdminPassword() {
  try {
    // Hash the password properly
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Update the admin user with the hashed password
    const [updated] = await User.update(
      { password: hashedPassword },
      { where: { email: 'admin@example.com' } }
    );

    if (updated === 0) {
      console.log('❌ Admin user not found');
      process.exit(1);
    }

    console.log('✅ Admin password reset successfully');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    console.log('\n✨ You can now log in to the admin panel!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();
