{
    description = "Development environment to run this project";

    inputs = {
        flake-utils.url = "github:numtide/flake-utils";

        # NodeJS 20.17.0
        nodejs_dep.url = "github:NixOS/nixpkgs/5ed627539ac84809c78b2dd6d26a5cebeb5ae269";
        # pnpm 9.10.0
        pnpm_dep.url = "github:NixOS/nixpkgs/673d99f1406cb09b8eb6feab4743ebdf70046557";
        # Sqlite 3.46.0
        sqlite_dep.url = "github:NixOS/nixpkgs/268bb5090a3c6ac5e1615b38542a868b52ef8088";
    };

    outputs = {
        self,
        flake-utils,
        nodejs_dep,
        pnpm_dep,
        sqlite_dep,
    } @ inputs:
        flake-utils.lib.eachDefaultSystem (system: let
            nodejs_dep = inputs.nodejs_dep.legacyPackages.${system};
            pnpm_dep = inputs.pnpm_dep.legacyPackages.${system};
            sqlite_dep = inputs.sqlite_dep.legacyPackages.${system};
        in {
            devShells.default = nodejs_dep.mkShell {
                packages = [
                    nodejs_dep.nodejs_20
                    pnpm_dep.pnpm
                    sqlite_dep.sqlite
                ];

                shellHook = ''
                    { echo -n NodeJS:\ ; node --version ; }
                    { echo -n pnpm:\ ; pnpm --version ; }
                    { echo -n SQLite:\ ; sqlite3 --version | awk '{print $1}' ; }
                '';
            };
        }
    );
}
