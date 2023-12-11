import os

import setuptools

package_name = "pipeline-tweaker-flask"


def read_readme():
    with open(os.path.join(os.path.dirname(__file__), "README.md"), encoding="utf8") as file:
        return file.read()


def read_version():
    module_path = os.path.join("__init__.py")
    with open(module_path) as file:
        for line in file:
            parts = line.strip().split(" ")
            if parts and parts[0] == "__version__":
                return parts[-1].strip("'")

    raise KeyError("Version not found in {0}".format(module_path))


def get_requires():
    with open("requirements.txt") as fp:
        dependencies = [line for line in fp if line and not line.startswith("#")]

        return dependencies


long_description = read_readme()
version = read_version()
requires = get_requires()


setuptools.setup(
    name=package_name,
    version=version,
    packages=setuptools.find_packages(),
    install_requires=requires,
    # extras_require=extra_requires,
    description="Pipeline-Tweaker",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/EdenWuyifan/PipelineTweaker",
    include_package_data=True,
    author="Eden Wu",
    author_email="eden.wu@nyu.edu",
    maintainer="Eden Wu",
    maintainer_email="eden.wu@nyu.edu",
    keywords=["interactive", "automl", "nyu"],
)
