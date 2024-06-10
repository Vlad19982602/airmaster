import prisma from '../prisma.js'
import { faker } from '@faker-js/faker';

async function main() {
  // Создание пользователей
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.past()
      },
    });
  }

  // Создание клиентов
  for (let i = 0; i < 10; i++) {
    await prisma.client.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        createdAt: faker.date.past()
      },
    });
  }

  // Создание проектов
  const clients = await prisma.client.findMany();
  for (let i = 0; i < 10; i++) {
    await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        clientId: clients[i % clients.length].id
      },
    });
  }

  // Создание материалов
  const projects = await prisma.project.findMany();
  for (let i = 0; i < 10; i++) {
    await prisma.material.create({
      data: {
        name: faker.commerce.productName(),
        quantity: faker.datatype.float({ min: 1, max: 100 }),
        projectId: projects[i % projects.length].id
      },
    });
  }

  // Создание оборудования
  for (let i = 0; i < 10; i++) {
    await prisma.equipment.create({
      data: {
        name: faker.commerce.productName(),
        quantity: faker.datatype.float({ min: 1, max: 100 }),
        projectId: projects[i % projects.length].id
      },
    });
  }

  // Создание сотрудников
  for (let i = 0; i < 10; i++) {
    await prisma.employee.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number()
      },
    });
  }

  // Создание подрядчиков
  for (let i = 0; i < 10; i++) {
    await prisma.contractor.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number()
      },
    });
  }

  // Создание записей рабочего времени
  const employees = await prisma.employee.findMany();
  const contractors = await prisma.contractor.findMany();
  for (let i = 0; i < 10; i++) {
    await prisma.workTime.create({
      data: {
        date: faker.date.past(),
        hours: faker.datatype.float({ min: 1, max: 10 }),
        projectId: projects[i % projects.length].id,
        employeeId: employees[i % employees.length]?.id,
        contractorId: contractors[i % contractors.length]?.id
      },
    });
  }

  // Создание отчетов
  for (let i = 0; i < 10; i++) {
    await prisma.report.create({
      data: {
        date: faker.date.past(),
        description: faker.lorem.sentence(),
        projectId: projects[i % projects.length].id,
        materialCost: faker.datatype.float({ min: 100, max: 1000 }),
        laborCost: faker.datatype.float({ min: 100, max: 1000 }),
        totalCost: faker.datatype.float({ min: 1000, max: 5000 })
      },
    });
  }

  // Создание финансовых записей
  for (let i = 0; i < 10; i++) {
    await prisma.financialEntry.create({
      data: {
        date: faker.date.past(),
        amount: faker.datatype.float({ min: 100, max: 1000 }),
        createdAt: faker.date.past()
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });