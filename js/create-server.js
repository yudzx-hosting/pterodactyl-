// Definisikan variabel global untuk Eggs, Nets, dan Location
const global = {
  eggs: '15',         // Egg ID (Disarankan untuk memilih sesuai jenis server)
  nets: '5',          // Network Allocation ID (Disarankan untuk memilih jaringan yang sesuai)
  location: '1',      // Location ID (Misalnya, '1' untuk lokasi di Amerika Serikat)
};

document.getElementById('createServerBtn').addEventListener('click', createServer);

async function createServer() {
  const ramSize = document.getElementById('ram').value; // Ambil nilai RAM yang dipilih
  
  // Validasi input RAM
  if (!ramSize || isNaN(ramSize) || ramSize < 1 || ramSize > 20) {
    alert("Please select a valid RAM size between 1GB and 20GB.");
    return;
  }

  // Menghitung memori, CPU, dan disk berdasarkan nilai RAM
  const memory = `${ramSize}200`; // Memori = RAM yang dipilih + 200 (misal, 1GB menjadi 1200MB)
  const cpu = ramSize * 2 * 10;  // CPU = RAM yang dipilih * 2 * 10 (contoh: 1GB menjadi 20%)
  const disk = `${ramSize}200`;  // Disk = RAM yang dipilih + 200 (misal, 1GB menjadi 1200MB)

  // Menampilkan hasil penghitungan untuk debugging (bisa dihilangkan)
  console.log(`RAM: ${ramSize}GB, Memori: ${memory}, CPU: ${cpu}%, Disk: ${disk}MB`);

  // Ambil user_id dari session atau Firebase Auth (pastikan ini valid)
  const userId = await getUserId();

  if (!userId) {
    alert("User ID is not valid. Please login first.");
    return;
  }

  // Kirim data ke API Pterodactyl untuk membuat server baru
  await createServerOnPterodactyl(ramSize, memory, cpu, disk, userId);
}

async function getUserId() {
  // Ambil ID pengguna dari Firebase Auth atau session
  const user = firebase.auth().currentUser;
  if (user) {
    return user.uid;  // Mengambil UID pengguna yang sedang login
  }
  return null;  // Jika pengguna tidak login
}

async function createServerOnPterodactyl(ramSize, memory, cpu, disk, userId) {
  try {
    const response = await fetch('https://vanoganteng.alwaysfelzz.my.id/api/application/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ptla_kNmj3LDFz6ikYhJY91MshsIv7g4j3HOBd7rqSDsU4HG' // Ganti dengan API key Pterodactyl Anda
      },
      body: JSON.stringify({
        name: `Server-${userId}-${ramSize}GB`,  // Nama server yang dibuat
        user: userId,  // ID pengguna yang sedang login
        egg: global.eggs,         // Egg ID dari variabel global
        allocation: global.nets,  // Network Allocation ID dari variabel global
        location: global.location, // Location ID dari variabel global
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18(ghcr.io/parkervcp/yolks:nodejs_18)", // Docker image yang digunakan
        startup: "npm start", // Skrip startup server
        limits: {
          memory: memory, // Memori dalam MB
          swap: 512, // Swap Memory
          disk: disk, // Disk space dalam MB
        },
        feature_limits: {
          allocations: 1,
        }
      })
    });

    const result = await response.json();
    if (response.ok) {
      alert("Server created successfully!");
      console.log(result); // Menampilkan informasi server yang baru dibuat
    } else {
      alert("Error creating server: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while creating the server.");
  }
}