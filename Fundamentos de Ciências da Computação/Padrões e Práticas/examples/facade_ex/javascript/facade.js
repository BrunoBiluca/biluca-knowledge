class UserClient {
    constructor(httpClient, authStorage, requestBuilder, userMapper, httpErrorHandler){
        this.httpClient = httpClient
        this.authStorage = authStorage
        this.requestBuilder = requestBuilder
        this.userMapper = userMapper
        this.httpErrorHandler = httpErrorHandler
    }

    async getById(id){
        const request = this.requestBuilder
            .auth(this.authStorage.getToken())
            .getById(id)
            .build()

        try {
            const res = await this.httpClient.get(request);    
            return this.userMapper.map(res);
        } catch (error) {
            this.httpErrorHandler.throw(error)
        }
    }
}

// userClient created somewhere
userClient.getById(1);