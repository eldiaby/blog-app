export interface JwtPayload {
	id: string;
	email?: string;
	role?: string;
	profilePhoto?: {
		uri: string;
		publicId: string | null;
	};
	[key: string]: unknown;
}
