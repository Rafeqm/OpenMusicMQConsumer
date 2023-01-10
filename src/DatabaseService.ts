import { Playlist, PrismaClient, Song } from "@prisma/client";

type PlaylistData = Playlist & { songs: Array<Song> };

export default class DatabaseService {
  private readonly _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient({
      errorFormat: "pretty",
    });
  }

  getPlaylistById(id: Playlist["id"]): Promise<PlaylistData | null> {
    return this._prisma.playlist.findUnique({
      where: {
        id,
      },
      include: {
        songs: true,
      },
    });
  }
}
