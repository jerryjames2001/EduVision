import language_tool_python

class GrammarChecker:
    def __init__(self):
        self.tool = language_tool_python.LanguageTool('en-US')
    
    def correct_text(self, text):
        matches = self.tool.check(text)
        return language_tool_python.utils.correct(text, matches)