require('dotenv').config();
const { User } = require('./models');

async function testLogin() {
  try {
    const user = await User.findOne({ where: { email: 'admin@example.com' } });
    
    if (!user) {
      console.log('❌ Admin user not found');
      process.exit(1);
    }

    console.log('✅ Admin user found');
    console.log('📧 Email:', user.email);
    console.log('🔒 Password hash:', user.password);
    
    // Test password comparison
    const isMatch = await user.comparePassword('admin123');
    console.log('🔑 Password matches admin123:', isMatch);
    
    if (!isMatch) {
      console.log('\n⚠️ Password does not match! The admin may have a different password.');
      console.log('Try resetting with a new password...');
    } else {
      console.log('\n✅ Admin login should work with email: admin@example.com and password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
