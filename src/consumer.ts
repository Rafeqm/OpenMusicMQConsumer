import { connect } from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const connection = await connect(process.env.RABBITMQ_SERVER!);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlist", { durable: true });
  channel.consume(
    "export:playlist",
    (message) => console.log(message?.content.toString()),
    { noAck: true }
  );
};

init();
