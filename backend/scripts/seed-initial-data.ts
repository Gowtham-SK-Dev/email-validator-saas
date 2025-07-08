import { Role, PaymentType, SubscriptionType, User } from "../src/models"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

const seedInitialData = async () => {
  try {

    // Seed roles
    const adminRole = await Role.findOrCreate({
      where: { role_name: "admin" },
      defaults: { role_name: "admin" },
    })

    const userRole = await Role.findOrCreate({
      where: { role_name: "user" },
      defaults: { role_name: "user" },
    })


    // Seed payment types
    await PaymentType.findOrCreate({
      where: { payment_type_name: "razorpay" },
      defaults: { payment_type_name: "razorpay" },
    })

    await PaymentType.findOrCreate({
      where: { payment_type_name: "stripe" },
      defaults: { payment_type_name: "stripe" },
    })

    await PaymentType.findOrCreate({
      where: { payment_type_name: "paypal" },
      defaults: { payment_type_name: "paypal" },
    })


    // Seed subscription types
    const subscriptionPlans = [
      { plan_name: "Free Trial", price: 0.0, hit_limit: 100, validity: 30 },
      { plan_name: "Basic Plan", price: 299.0, hit_limit: 1000, validity: 30 },
      { plan_name: "Pro Plan", price: 599.0, hit_limit: 5000, validity: 30 },
      { plan_name: "Business Plan", price: 999.0, hit_limit: 15000, validity: 30 },
      { plan_name: "Enterprise Plan", price: 1999.0, hit_limit: 50000, validity: 30 },
      { plan_name: "Unlimited Plan", price: 4999.0, hit_limit: 999999, validity: 30 },
    ]

    for (const plan of subscriptionPlans) {
      await SubscriptionType.findOrCreate({
        where: { plan_name: plan.plan_name },
        defaults: plan,
      })
    }


    // Create admin user if not exists
    const adminExists = await User.findOne({ where: { username: "admin" } })
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await User.create({
        username: "admin",
        password: hashedPassword,
        mobile_number: "+919999999999",
        email: "admin@emailverification.com",
        api_key: `sk-admin-${uuidv4()}`,
        api_secret: uuidv4(),
        balance_click_count: 999999,
        is_active: true,
        role_id: adminRole[0].id,
        zip_code: 0, 
      })
    }

    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

seedInitialData()
