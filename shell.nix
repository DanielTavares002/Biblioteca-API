{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    firebase-tools
    openjdk11  # Para Firebase Emulators
    docker-client
  ];
  
  shellHook = ''
    echo "🚀 Ambiente de desenvolvimento carregado!"
    echo "✅ Node.js $(node --version)"
    echo "✅ Java $(java -version 2>&1 | head -1)"
    echo "✅ Firebase $(firebase --version 2>/dev/null || echo 'disponível')"
  '';
}
