
// Login dengan Google
document.getElementById('loginButton').addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        const userDoc = await db.collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            // Kalau user baru, isi dengan data dasar
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                name: user.displayName || '',
                nickname: '',
                genre: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('Akun Google baru berhasil dibuat, silakan lengkapi profilmu!');
            window.location.href = "lengkapi-profil.html"; // Bikin page ini untuk lengkapi profil
        } else {
            // Kalau sudah ada data
            const data = userDoc.data();
            if (!data.nickname || !data.genre) {
                alert('Profilmu belum lengkap, yuk lengkapi!');
                window.location.href = "lengkapi-profil.html"; // redirect ke form lengkapin profil
            } else {
                alert('Berhasil login!');
                window.location.href = "home.html"; // redirect ke halaman home
            }
        }

    } catch (error) {
        alert('Gagal login dengan Google: ' + error.message);
    }
});
