sudo apt-get update
sudo apt-get install -y git
sudo apt-get install -y curl
sudo apt-get install -y gcc g++ make
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
cd /usr/local
sudo git clone https://github.com/jeanbmar/black-moon-rewind.git
cd black-moon-rewind
sudo npm ci --production --workspace=packages/core
npm run start
