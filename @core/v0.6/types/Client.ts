import { ClientOptions } from "@discordjs/core";

export interface ClientInterface {
    rest : ClientOptions["rest"],
    gateway: ClientOptions["gateway"]
}