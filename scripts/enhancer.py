import json
from langchain_core.prompts import PromptTemplate
from langchain_community.llms.ollama import Ollama


def build_ollama_llm():
    return Ollama(model="llama3.1")


def read_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def build_jobs_info_prompt():
    """
    This builds the prompt for formatting the job highlights, but it does not
    guarantee the output to be in proper format, hence manual review should be done and
    solely believing on the output of model is not recommended.
    :return: PromptTemplate
    """
    prompt = """
    Rephrase the following job highlights using STAR method and do not quote Situation,Task,Action,Result.
    Do not quote rephrased as the first line.
    Do not use any markdown syntax.
    Do not use any bullet point symbols.
    {job_highlights}
    Just return the output only in linear bullet points without nesting
    """
    return PromptTemplate.from_template(prompt)


def write_data_to_file(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=2)


OLLAMA_CLIENT = build_ollama_llm()
data = read_json("static/jobsInfo.json")

for job in data:
    details = job['details']
    rephrase_chain = build_jobs_info_prompt() | OLLAMA_CLIENT
    out = rephrase_chain.invoke({'job_highlights': details})
    job['details'] = out.strip().split('\n')

write_data_to_file("static/jobsInfoEnhanced.json", data)
