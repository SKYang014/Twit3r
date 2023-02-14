import { tweetSchema } from "../../../components/CreateTweet"
import {protectedProcedure, router} from "../trpc"

export const tweetRouter = router({
    create: protectedProcedure
    .input(
        // z.object({text: z.string(
        //     {
        //         required_error:'Tweet text is required',
        //     }
        // ),
        // })
        tweetSchema
    )
    .mutation(({ctx, input})=>{
        const {prisma, session} = ctx;
        const {text} = input;

        const userId = session.user.id

        return prisma.tweet.create({
            data: {
                text, 
                author: {
                    connect: {
                        id:userId,
                    },
                },
            },
        },
        )
    })
})