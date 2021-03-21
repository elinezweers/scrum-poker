import { Injectable } from "@nestjs/common";
import { Member } from "./poker.members.service";
import { MemberGroups, PokersService } from "./pokers.service";

export interface MembersResponse {
	voters: string[];
	observers: string[];
	disconnected: string[];
}

@Injectable()
export default class MembersResponseFormattingService {
	/**
	 * Constructor
	 *
	 * @param {PokersService} pokersService The Poker service.
	 */
	 constructor(
		private readonly pokersService: PokersService,
	 ) {};

	/**
	 * Formats the members in a room for response.
	 *
	 * @param {MemberGroups} memberGroups The members in their groups.
	 *
	 * @returns {MembersResponse} The formatted list.
	 */
	public formatMembersResponse( room: string ): MembersResponse {
		const memberGroups: MemberGroups = this.pokersService.getMembers( room );

		const mapCallback = ( ( member: Member ): string => member.name );

		return {
			voters: memberGroups.voters.map( mapCallback ),
			observers: memberGroups.observers.map( mapCallback ),
			disconnected: memberGroups.disconnected.map( mapCallback ),
		};
	}
}
