const MONGO_IP_ADDRESS = "45.142.36.130"

const getMongoUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `mongodb://${process.env.MONGO_USERNAME_TEST}:${process.env.MONGO_PASSWORD_TEST}@${MONGO_IP_ADDRESS}:27017/${process.env.MONGO_BD_NAME_TEST}`
  }

  return `mongodb://${process.env.MONGO_USERNAME_PROD}:${process.env.MONGO_PASSWORD_PROD}@${MONGO_IP_ADDRESS}:27017/${process.env.MONGO_BD_NAME_PROD}`
}

module.exports = {
  getMongoUrl
}