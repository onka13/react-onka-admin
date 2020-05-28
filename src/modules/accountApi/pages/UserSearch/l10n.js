export default {
    'AccountApi/UserSearch' : {
        name: 'User',
        fields: {
            id:"Id",
			name:"Name",
			email:"Email",
			passwordHash:"PasswordHash",
			emailConfirmed:"EmailConfirmed",
			lockoutEndDateUtc:"LockoutEndDateUtc",
			accessFailedCount:"AccessFailedCount",
			status:"Status"
        }
    }
}
