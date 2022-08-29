const dbConfig = {
    dbUsername: 'prime-user',
    dbPassword: '886vwh92rXuMcgEj',
    clusterUri: 'cluster0.mvizz.mongodb.net',
    dbName: 'e-commerce'
}

module.exports = `mongodb+srv://${dbConfig.dbUsername}:${dbConfig.dbPassword}@${dbConfig.clusterUri}/${dbConfig.dbName}`