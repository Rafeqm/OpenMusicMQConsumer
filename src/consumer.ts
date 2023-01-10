import { connect } from "amqplib";
import dotenv from "dotenv";

import DatabaseService from "./DatabaseService.js";
import Listener from "./Listener.js";
import MailSender from "./MailSender.js";

dotenv.config();

const init = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const connection = await connect(process.env.RABBITMQ_SERVER!);
  const channel = await connection.createChannel();
  await channel.assertQueue("export:playlist", { durable: true });

  const databaseService = new DatabaseService();
  const mailSender = new MailSender();
  const listener = new Listener(databaseService, mailSender);

  channel.consume("export:playlist", listener.listen, { noAck: true });
};

init();
