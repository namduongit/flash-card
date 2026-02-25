import bcrypt from "bcrypt"

export class BcyptHashing {
    private saltRound: number;
    private secretKey: string;

    constructor() {
        this.saltRound = Number(process.env.SALT_ROUND);
        this.secretKey = process.env.SECRET_KEY!;
    }

    async hashPlainResource(plainResource: string): Promise<string> {
        return bcrypt.hash(plainResource + this.secretKey, this.saltRound);
    }

    async compareResource(plainResource: string, hashResource: string): Promise<boolean> {
        return bcrypt.compare(plainResource + this.secretKey, hashResource);
    }
}