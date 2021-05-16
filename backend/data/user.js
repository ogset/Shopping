import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    cart: [],
    address: [],
    totalPrice: 0,
  },
  {
    name: 'Oğuzhan',
    email: 'oguzhan2guler@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    cart: [],
    address: [
      {
        firstName: 'Oğuzhan',
        lastName: 'Güler',
        title: 'Home',
        country: 'Turkey',
        city: 'Çanakkale',
        street: 'Yazıcızade Şehit Hasan Ayçicek 4.Sokak',
        postalCode: '17500',
        defaultDelivery: false,
        defaultBilling: false,
      },
      {
        firstName: 'Oğuzhan',
        lastName: 'Güler',
        title: 'School',
        country: 'Turkey',
        city: 'Kocaeli',
        street: '28 Haziran Mahallesi',
        postalCode: '41500',
        defaultDelivery: false,
        defaultBilling: false,
      },
      {
        firstName: 'Oğuzhan',
        lastName: 'Güler',
        title: 'School',
        country: 'Turkey',
        city: 'İzmir',
        street: 'Karşıyada',
        postalCode: '41500',
        defaultDelivery: false,
        defaultBilling: false,
      },
    ],
    totalPrice: 0,
  },
  {
    name: 'Utku',
    email: 'utku@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    cart: [],
    address: [],
    totalPrice: 0,
  },
]

export default users
