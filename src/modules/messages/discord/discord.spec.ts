import { postGIF } from "."

global.fetch = async() => {
    return {
        ok: false
    }
}

// const fetchStub = vi.fn(async() => {
//     return {
//         ok: false
//     }
// })
// global.fetch = fetchStub -- mock result value once
// pass fetch as dependency

const fakeChannel = {
    send: () => {}
}

describe('TENOR API', () => {
    it('should get Error', async() => {
        const result = postGIF(fakeChannel as any)
        await expect(result).rejects.toThrowError(/Failed to fetch GIF/)
    })
})