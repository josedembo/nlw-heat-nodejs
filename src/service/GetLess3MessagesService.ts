import prismaClient from "../prisma"




class GetLess3MessagesService {

    async excute() {

        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true
            }
        });

        return messages;
    };
}


export { GetLess3MessagesService }