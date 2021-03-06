const lang = {
	ra: {
		action: {
			add_filter: 'Filtre ekle',
			add: 'Ekle',
			back: 'Geri Dön',
			bulk_actions: '%{smart_count} seçildi',
			cancel: 'İptal',
			clear_input_value: 'Temizle',
			clone: 'Çoğalt',
			create: 'Yeni Kayıt',
			delete: 'Sil',
			edit: 'Düzenle',
			export: 'Dışa aktar',
			list: 'Listele',
			refresh: 'Yenile',
			remove_filter: 'Filtreyi kaldır',
			remove: 'Kaldır',
			save: 'Kaydet',
			search: 'Arama',
			show: 'Göster',
			sort: 'Sırala',
			undo: 'Geri al',
		},
		boolean: {
			null: '',
			true: 'Evet',
			false: 'Hayır',
		},
		page: {
			create: '%{name} oluştur',
			dashboard: 'Ana Sayfa',
			edit: '%{name} #%{id}',
			error: 'Bazı şeyler yolunda değil',
			list: '%{name} listesi',
			loading: 'Yükleniyor',
			not_found: 'Sayfa bulunamadı',
			show: '%{name} #%{id}',
			empty: 'Kayıt bulunamadı',
			invite: '',
		},
		input: {
			file: {
				upload_several: 'Yüklemek istediğiniz dosyaları buraya sürükleyin ya da seçmek için tıklayın.',
				upload_single: 'Yüklemek istediğiniz dosyayı buraya sürükleyin ya da seçmek için tıklayın..',
			},
			image: {
				upload_several: 'Yüklemek istediğiniz resimleri buraya sürükleyin ya da seçmek için tıklayın.',
				upload_single: 'Yüklemek istediğiniz resmi buraya sürükleyin ya da seçmek için tıklayın.',
			},
			references: {
				all_missing: 'Unable to find references data.',
				many_missing: 'İlişkilendirilmiş referanslardan en az biri artık mevcut değil.',
				single_missing: 'İlişkilendirilmiş referans artık mevcut değil.',
			},
		},
		message: {
			about: 'Hakkında',
			are_you_sure: 'Emin misiniz?',
			bulk_delete_content: '%{name} silmek istediğinizden emin misiniz? |||| %{smart_count} öğeyi silmek istediğinizden emin misiniz?',
			bulk_delete_title: '%{name} sil |||| %{smart_count} %{name} öğesi sil',
			delete_content: 'Bu öğeyi silmek istediğinizden emin misiniz?',
			delete_title: '%{name} #%{id} Sil',
			details: 'Detaylar',
			error: 'Bir istemci hatası oluştu ve isteğiniz tamamlanamadı.',
			invalid_form: 'Form geçerli değil. Lütfen hataları kontrol edin',
			loading: 'Sayfa yükleniyor, lütfen bekleyiniz',
			no: 'Hayır',
			not_found: 'Hatalı bir URL girdiniz ya da yanlış bir linke tıkladınız',
			yes: 'Evet',
		},
		navigation: {
			no_results: 'Kayıt bulunamadı',
			no_more_results: '%{page} sayfası mevcut değil. Önceki sayfayı deneyin.',
			page_out_of_boundaries: '%{page} sayfası mevcut değil',
			page_out_from_end: 'Son sayfadan ileri gidemezsin',
			page_out_from_begin: '1. sayfadan geri gidemezsin',
			page_range_info: '%{offsetBegin}-%{offsetEnd} of %{total}',
			next: 'Sonraki',
			prev: 'Önceki',
		},
		auth: {
			auth_check_error: 'Devam etmek için lütfen giriş yapınız',
			username: 'Kullanıcı adı',
			password: 'Parola',
			sign_in: 'Giriş yap',
			sign_in_error: 'Giriş başarısız. Lütfen tekrar deneyin',
			logout: 'Çıkış',
		},
		notification: {
			updated: 'Öğe güncellendi |||| %{smart_count} öğe güncellendi',
			created: 'Öğe oluşturuldu',
			deleted: 'Öğe silindi |||| %{smart_count} öğe silindi',
			bad_item: 'Hatalı öğe',
			item_doesnt_exist: 'Öğe bulunamadı',
			http_error: 'Sunucu iletişim hatası',
			data_provider_error: 'dataProvider hatası. Detay için konsolu gözden geçir.',
			canceled: 'Eylem iptal edildi',
			logged_out: 'Oturum sona erdi',
		},
		validation: {
			required: 'Zorunlu alan',
			minLength: 'En az %{min} karakter',
			maxLength: 'En fazla %{max} karakter',
			minValue: 'En az %{min} olmalı',
			maxValue: 'En fazla %{max} olmali',
			number: 'Sayısal bir değer olmalı',
			email: 'E-posta geçerli değil',
			oneOf: 'Bunlardan biri olmalı: %{options}',
			regex: 'Belirli bir formatla eşleşmelidir (regexp): %{pattern}',
		},
		tree: {
			drag_preview: 'Node #%{id} |||| Node #%{id} with %{smart_count} children',
			root_target: 'Drop an item here to make it top level',
		},
	},
	api: {
		code0: 'Hata oluştu!',
		'code-2': 'Yetkisiz erişim!',
		'code-10': 'Boş model!',
		'code-11': 'Hatalı model!',
		'code-12': 'Bulunamadı!',
		code10: 'Silindi',
		code11: 'Kaydedildi',
		code12: 'Oluşturuldu',
		code100: 'Go to login',
		code101: 'Refresh token',
		code102: 'Email in use',
		code103: 'Hatalı kullanıcı adı veya şifre!',
	},
	menu: {
		dashboard: 'Ana sayfa',
		adminApi: 'Admin',
		accountApi: 'Kullanıcılar',
		testApi: 'Test',
		changeLang: 'Dili Değiştir',
		logout: 'Çıkış',
	},
	pages: {
		breadCrumbs: {
			list: 'Liste',
			detail: 'Detay',
			new: 'Yeni Kayıt',
			edit: 'Güncelle',
		},
		action: {
			saveAndNew: 'Yeni Kayıt ve Yeni',
			select: 'Seç',
		},
		role: {
			admin: 'Owner',
			list: 'Liste',
			get: 'Detay',
			new: 'Yeni Kayıt',
			edit: 'Güncelleme',
			delete: 'Silme',
			save: 'Kaydet',
			assignRole: 'Rol Atama',
		},
		modules: {
			Admin: 'Admin',
			AdminApi: 'Admin',
			AccountApi: 'Account',
			TestApi: 'Test',
		},
	},
	tabs: {},
	footer: {
		privacy: 'Gizlilik',
		support: 'Destek',
		terms: 'Kullanım Şartları',
		contact: 'İletişim',
	},
	other: {
		adminUser: {
			roles: 'Roller',
		},
	},
	enums: {
		Language: {
			tr: 'Türkçe',
			en: 'İngilizce',
		},
		Status: {
			Active: 'Aktif',
			Passive: 'Pasif',
			Deleted: 'Silinmiş',
		},
		DeviceType: {
			Web: 'Web',
			Android: 'Android',
			IOS: 'IOS',
			WindowsMobile: 'Windows Mobile',
		},
		AdminUserTheme: {
			Light: 'Açık',
			Dark: 'Koyu',
		},
	},
	resources: {
		'AdminApi/RoleMap': {
			name: 'Rol Haritası',
			fields: {},
		},
		'AdminApi/AdminUserSearch': {
			name: 'Admin Kullanıcıları',
			fields: {
				id: 'Id',
				name: 'Name',
				email: 'Email',
				pass: 'Pass',
				language: 'Language',
				allowIpAddress: 'AllowIpAddress',
				status: 'Status',
				no: 'No',
				theme: 'Theme',
				isSuper: 'IsSuper',
			},
		},
		'AdminApi/AdminRoleSearch': {
			name: 'Admin Rolleri',
			fields: {
				id: 'Id',
				name: 'Name',
			},
		},
		'AccountApi/UserSearch': {
			name: 'Kullanıcılar',
			fields: {
				id: 'Id',
				name: 'Name',
				email: 'Email',
				passwordHash: 'PasswordHash',
				emailConfirmed: 'EmailConfirmed',
				lockoutEndDateUtc: 'LockoutEndDateUtc',
				accessFailedCount: 'AccessFailedCount',
				status: 'Status',
			},
		},
		'TestApi/BookEfSearch': {
			name: 'Book Entity Framework',
			fields: {
				id: 'Id',
				name: 'Name',
				price: 'Price',
				category: 'Category',
				author: 'Author',
			},
		},
		'TestApi/BookElasticSearch': {
			name: 'Book Elasticsearch',
			fields: {
				id: 'Id',
				name: 'Name',
				price: 'Price',
				category: 'Category',
				author: 'Author',
			},
		},
		'TestApi/BookMongoSearch': {
			name: 'Book MongoDB',
			fields: {
				id: 'Id',
				name: 'Name',
				price: 'Price',
				category: 'Category',
				author: 'Author',
			},
		},
	},
};

require('./language-common').editLang(lang);

export default lang;
