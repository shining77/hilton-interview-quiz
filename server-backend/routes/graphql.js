const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const { mongoose, Schema } = require('mongoose')

const GuestSchema = new Schema({
  name: String,
  phone: String,
  loginTime: String,
  createTime: String,
  updateTime: String,
  status: Number
})

const EmployeeSchema = new Schema({
  name: String,
  code: String,
  loginTime: String,
  createTime: String,
  updateTime: String,
  status: Number
})

const OrderSchema = new Schema({
  guests_id: String,
  username: String,
  time: String,
  date: String,
  table: String,
  phone: String,
  status: Number
})

const uri = "mongodb://127.0.0.1:27017/hilton"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const conn = mongoose.createConnection(uri, options);
conn.on('open', () => {});

const guestModel = conn.model('guest', GuestSchema);
const employeeModel = conn.model('employee', EmployeeSchema);
const orderModel = conn.model('order', OrderSchema);

const schema = buildSchema(`
  type Guests {
    _id: ID
    phone: String
  }

  type Employees {
    _id: ID
    name: String
    code: String
  }

  type Orders {
    _id: ID
    date: String
    time: String
    table: Int
    username: String
    phone: String
    status: Int
    guests_id: ID
  }

  type User {
    _id: ID
  }

  type Query {
    users(
      phone: String
      id: ID
      ): [User]

    guests(
      phone: String
      _id: ID
      ): [Guests]

    employees(
      name: String
      code: String
      _id: ID
      ): [Employees]

    order (
      _id: ID
      guests_id: String
      date: String
      time: String
      startDate: String
      endDate: String
      table: Int
      username: String
      phone: String
      status: Int
    ): [Orders]
  }

  input loginInput {
    name: String
    phone: String
    code: String
  }
  input addOrderInput {
    _id: ID
    guests_id: ID
    date: String
    time: String
    table: Int
    username: String
    phone: String
    status: Int
}
  type Mutation {
    login(input: loginInput): User
    addOrder(input: addOrderInput): Orders
    updateOrder(input: addOrderInput): Orders
    candelOrder(input: addOrderInput): Orders
  }
`);

const rootValue = {
  users: async ({phone}) => {
    const doc = await guestModel.find({phone});
    return doc;
  },
  guests: async ({phone}) => {
    const doc = await guestModel.find({phone});
    return doc;
  },
  employees: async ({name}) => {
    const doc = await employeeModel.find({name});
    return doc;
  },
  order: async ({startDate, endDate, guests_id, username, time, date, status}) => {
    const data = {};
    if (startDate) {
      data['date'] = {$gte: startDate};
    }
    if (endDate) {
      data['date'] = {$lte: endDate};
    }

    if (guests_id) {
      data['guests_id'] = guests_id;
    }
    const doc = await orderModel.find(data);
    return doc;
  },
  addOrder: async ({input}) => {
    return await (new orderModel(input)).save();
  },
  candelOrder: async ({input}) => {
    return await (new orderModel(input)).updateOne(
      input,
      {status: input.status},
      {upsert: true}
    );
  },
  updateOrder: async ({input}) => {
    return await (new orderModel(input)).updateOne(
      input,
      input,
      {upsert: true}
    );
  },
  login: async({input}) => {
    let doc;
    input = {_id: "", input};
    if (input.name) {
      doc = await employeeModel.find(input);
      doc = doc[0];
    } else {
      doc = await guestModel.find({phone: input.phone});

      if (!doc.length) {
        doc = doc[0];
      } else {
        doc = await (new guestModel({phone: input.phone})).save();
      }

    }
    return doc;
  }
};

module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
});
