{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    openssl_1_1
    prisma-engines
  ];

  shellHook = ''
    export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
    export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
    export LD_LIBRARY_PATH="${pkgs.openssl_1_1.out}/lib:$LD_LIBRARY_PATH"
    echo "✅ Ambiente configurado com OpenSSL 1.1 para Prisma"
    echo "🚀 Execute: npm run dev"
  '';
}
