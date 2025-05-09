{
    description = "Development environment to run this project";

    inputs = {
        flake-utils.url = "github:numtide/flake-utils";

        # Project Packages
        # NodeJS 22.14.0
        nodejs_dep.url = "github:NixOS/nixpkgs/eb0e0f21f15c559d2ac7633dc81d079d1caf5f5f";
        # pnpm 10.8.0
        pnpm_dep.url = "github:NixOS/nixpkgs/b2b0718004cc9a5bca610326de0a82e6ea75920b";
        # Sqlite 3.48.0
        sqlite_dep.url = "github:NixOS/nixpkgs/18dd725c29603f582cf1900e0d25f9f1063dbf11";
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
                    nodejs_dep.nodejs_22
                    pnpm_dep.pnpm
                    sqlite_dep.sqlite
                ];

                shellHook = ''
                    { exec zsh ; }
                    { echo -n NodeJS:\ ; node --version ; }
                    { echo -n pnpm:\ ; pnpm --version ; }
                    { echo -n SQLite:\ ; sqlite3 --version | awk '{print $1}' ; }
                '';
            };
        }
    );
}
