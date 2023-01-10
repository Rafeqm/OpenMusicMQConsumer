import { ConsumeMessage } from "amqplib";

import DatabaseService from "./DatabaseService";
import MailSender from "./MailSender";

export default class Listener {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _mailSender: MailSender
  ) {}

  listen = async (message: ConsumeMessage | null) => {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        message!.content.toString()
      );

      const playlist = await this._databaseService.getPlaylistById(playlistId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        "playlist",
        JSON.stringify({ playlist })
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
}
