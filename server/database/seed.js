import url from 'url'
import util from 'util'

import Sequelize, { DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize('postgresql:///grapevine')

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Server extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Invite extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class ServerUser extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(35),
    },
    passwordHash: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'user',
    sequelize,
    timestamps: false,
  }
)

Server.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isPrivate: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'server',
    sequelize,
    timestamps: false,
  }
)

Invite.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    invite: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'invite',
    sequelize,
    timestamps: false,
  }
)

Message.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'message',
    sequelize,
    timestamps: false,
  }
)

ServerUser.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'server_user',
    sequelize,
    timestamps: false,
  }
)

User.belongsToMany(Server, { through: ServerUser })
Server.belongsToMany(User, { through: ServerUser })

User.hasMany(Message)
Message.belongsTo(User)

Server.hasMany(Message)
Message.belongsTo(Server)

Server.hasMany(Invite)
Invite.belongsTo(Server)

// if running from command line, sync database
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing database...')
  await sequelize.sync({ force: true })
  console.log('Finished syncing database')
  await sequelize.close()
}

export { User, Server, Invite, Message, ServerUser }
